import { User } from '../models/user.model';

export const mockUsersData: User[] = [
    {
        id: '1',
        name: 'Admin Sistema',
        email: 'admin@sgb.com',
        cpf: '123.456.789-00',
        phone: '(11) 98765-4321',
        role: 'bibliotecario',
        status: 'ativo',
    },
    {
        id: '2',
        name: 'João Recepcionista',
        email: 'recepcao@sgb.com',
        cpf: '987.654.321-00',
        phone: '(11) 97654-3210',
        role: 'recepcionista',
        status: 'ativo',
    },
    {
        id: '3',
        name: 'Maria Leitora',
        email: 'maria@email.com',
        cpf: '456.789.123-00',
        phone: '(11) 96543-2109',
        role: 'leitor',
        status: 'ativo',
    },
    {
        id: '4',
        name: 'Carlos Silva',
        email: 'carlos@email.com',
        cpf: '789.123.456-00',
        phone: '(11) 95432-1098',
        role: 'leitor',
        status: 'ativo',
    },
    {
        id: '5',
        name: 'Ana Souza',
        email: 'ana@email.com',
        cpf: '321.654.987-00',
        phone: '(11) 94321-0987',
        role: 'leitor',
        status: 'inativo',
    },
];
