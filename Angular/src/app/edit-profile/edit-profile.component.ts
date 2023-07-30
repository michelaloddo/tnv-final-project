import { Component } from '@angular/core';
import { AuthService } from "src/app/@core/services/auth.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  newEmail: string = '';
  newPassword: string = '';

  constructor(private authService: AuthService) { }

  onSubmit() {
    const updatedUser = {
      email: this.newEmail,
      password: this.newPassword,
      id: this.authService.getCurrentUser()
    };

    
    this.authService.updateProfile(updatedUser).subscribe({
      next: (id) => {

        console.log('Profilo aggiunto correttamente', id);
      },
      error: (error) => {
        console.error('Errore', error);
      }
    });
  }
}
