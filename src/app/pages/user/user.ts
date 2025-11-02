import { Component } from '@angular/core';
import { UserCard, type UsersCard } from '../../components/user-card/user-card';
import { PrimaryButton } from "../../components/shared/primary-button/primary-button";

@Component({
  selector: 'app-user',
  imports: [UserCard, PrimaryButton],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User {
  users: UsersCard[] = [
    {
      name: 'Vitor Lima',
      role: 'User',
      position: 'Gestão de Frotas',
      status: 'Ativo',
    },
    {
      name: 'Vitor Lima',
      role: 'RH',
      position: 'Gestão de Frotas',
      status: 'Inativo',
    },
    {
      name: 'Vitor Lima',
      role: 'Administrador',
      position: 'Gestão de Frotas',
      status: 'Ativo',
    },
    {
      name: 'Vitor Lima',
      role: 'Administrador',
      position: 'Gestão de Frotas',
      status: 'Inativo',
    },
  ];

  activeUsers = this.users.filter((user) => user.status === "Ativo");
  userAdmin = this.users.filter((user) => user.role === "Administrador");
}
