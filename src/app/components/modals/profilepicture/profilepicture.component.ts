import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Preferences } from '@capacitor/preferences';
import { environment } from 'src/environments/environment';

//gpt

import { Camera, CameraResultType, CameraSource} from '@capacitor/camera';

// import { AuthService } from '../services/auth.service'; // Servicio para enviar la URL al backend
// import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ref, uploadString, getDownloadURL, Storage, uploadBytes} from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { AuthInterceptor } from 'src/app/services/auth.interceptor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profilepicture',
  templateUrl: './profilepicture.component.html',
  styleUrls: ['./profilepicture.component.scss'],
})
export class ProfilepictureComponent  implements OnInit {

  tweetText: string = '';
  selectedImages: string[] = [];
  maxImages: number = 4;
  private apiURL = environment.localURL;
  private ID = environment.id;

  @ViewChild('fileInput', { static: false }) fileInput: any;
  password: string = '';
  email: string = '';
  loading: boolean = false;

  selectedImage: string | null = null;
  imageUrl: string | null | undefined = null;

  constructor( private http: HttpClient,
    private storage: Storage,
    private authService: AuthInterceptor,
    private modalController: ModalController,
    private alertController: AlertController) {
    
   }

   dismissModal() {
    this.modalController.dismiss();
  }

  

  //terminar de conectar, pedir el id de usuario para asociar la foto
  postPhoto(_id:string ,profilePhoto: string):Observable<any>{ 
    const body = { _id, profilePhoto };
    return this.http.put(`${this.apiURL}/auth/updateprofilephoto`, body);
  }

  async setProfilePicture(){
    const imagesInDataURLFormat = await Promise.all(this.selectedImages.map(imagePath => this.convertToBase64(imagePath)));

    // Subir imágenes a Firebase Storage
    for (const image of imagesInDataURLFormat) {
      const imageName = `${Date.now()}_${Math.floor(Math.random() * 10000)}.jpg`; // Nombre único para cada imagen
      const filePath = `profilepicture/${imageName}`;
      const storageRef = ref(this.storage, filePath);
  
      try {
        await uploadString(storageRef, image, 'data_url');
        const downloadURL = await getDownloadURL(storageRef);
        
        if (downloadURL) {
          this.postPhoto(this.ID, downloadURL).subscribe(
            response => {
              console.log('Foto de perfil actualizada con éxito:', response);
            },
            error => {
              console.error('Error al actualizar la foto de perfil:', error);
            }
          );
        }
        console.log('URL de descarga:', downloadURL);
        // Luego, puedes guardar la URL de descarga y el tweet en Firebase Firestore
      } catch (error) {
        console.error('Error al subir la imagen:', error);
      }
    }
  }




  async openGallery() {
    if (this.selectedImages.length >= this.maxImages) {
      return;
    }

    const image = await this.getGalleryImage();
    if (image) {
      this.selectedImages.push(image);
    }
  }

  async openCamera() {
    if (this.selectedImages.length >= this.maxImages) {
      // Límite de imágenes alcanzado, no permitir más capaz deberia poner el mensaje de error pero esta el contador entonces como que no se
      return;
    }

    const image = await this.takeCameraPhoto();
    if (image) {
      this.selectedImages.push(image);
    }
  }

  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
  }

  async postTweet() {
    // // Convierte las imágenes seleccionadas a formato de URL de datos
    // const imagesInDataURLFormat = await Promise.all(this.selectedImages.map(imagePath => this.convertToBase64(imagePath)));

    // // Subir imágenes a Firebase Storage
    // for (const image of imagesInDataURLFormat) {
    //   const imageName = `${Date.now()}_${Math.floor(Math.random() * 10000)}.jpg`; // Nombre único para cada imagen
    //   const filePath = `profilePics/${imageName}`;
    //   const storageRef = ref(imageName, `ubernt/profile/${file.name}`);
    //   const uploadTask = storageRef.putString(image, 'data_url');

    //   uploadTask.snapshotChanges().pipe(
    //     finalize(() => {
    //       storageRef.getDownloadURL().subscribe((downloadURL) => {
    //         // guardarla en una base de datos Firebase
    //         console.log('URL de descarga:', downloadURL);
    //         // Luego, puedes guardar la URL de descarga y el tweet en Firebase Firestorage
    //       });
    //     })
    //   ).subscribe();
    // }
  }

  async convertToBase64(imagePath: string | undefined): Promise<string> {
    if (!imagePath) {
      // Manejar el caso en el que imagePath es undefined
      return '';
    }

    const image = await fetch(imagePath);
    const blob = await image.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  }

  async getGalleryImage() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });
    const base64Image = await this.convertToBase64(image.webPath);
    return base64Image;
  }

  getImageSize() {
    const imageCount = this.selectedImages.length;
    const containerSize = 12;
    if (imageCount < 3) {
      return containerSize / imageCount;
    } else if (imageCount <= 4) {
      return containerSize / 2;
    } else {
     
      return containerSize / 4;
    }
  }

  async takeCameraPhoto() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
    });
    const base64Image = await this.convertToBase64(image.webPath);
    return base64Image;
  }


  ngOnInit() {

  }

}
