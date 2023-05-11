
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 150, nullable: false })
    nome: string;

    @Column({ type: 'varchar', length: 250, nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    imagem: string;
}


