import { Component, inject, OnInit } from '@angular/core';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
})
export class StorageComponent   {
  private readonly storage: Storage = inject(Storage);
  // constructor() { }
  uploadFile($event: any) {
    const file = $event.target.files[0];
    console.log(file);
    const imgRef = ref(this.storage, `ubernt/profile/${file.name}`);
    
    uploadBytes(imgRef, file)
    .then(res => console.log(res))
    .catch(error => console.error(error));


    // if (!input.files) return

    // const files: FileList = input.files;

    // for (let i = 0; i < files.length; i++) {
    //     const file = files.item(i);
    //     if (file) {
    //         const storageRef = ref(this.storage, file.name);
    //         uploadBytesResumable(storageRef, file);
    //     }
    // };
  }
  // ngOnInit() {}
}
