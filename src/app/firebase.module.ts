import { NgModule } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';  
import { provideStorage, getStorage } from '@angular/fire/storage';        
import { environment } from '../app/environments/environment';

@NgModule({
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),  
    provideStorage(() => getStorage())       
  ]
})
export class FirebaseModule {}
