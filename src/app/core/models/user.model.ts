export type UserRole = 'leitor' | 'recepcionista' | 'bibliotecario';

export interface User {
    id: string;
    name: string;
    email: string;
    cpf: string;
    phone: string;
    role: UserRole;
    status: 'ativo' | 'inativo';
}
