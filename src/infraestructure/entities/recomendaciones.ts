import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity ("recomendaciones")
export class Recomendaciones {
    @PrimaryGeneratedColumn()
    id_recomendacion!: number;

    @Column({type: "int"})
    apartament_id!: number;

    @Column({type: "varchar", length: 100})
    title!: string;

    @Column({type: "text"})
    descripcion!: string;

    @Column({type: "varchar", length: 100})
    categoria!: string;

    @Column({type: "varchar", length: 100})
    prioridad!: string;

    @Column({type: "decimal", precision: 10, scale: 2, nullable: true})
    ahorro_estimado?: number;

    @Column({type: "decimal", precision: 10, scale: 2, nullable: true})
    costo_ahorro_estimado?: number;

    @Column({type: "varchar", length: 100, default: "pending"})
    status!: string;
    
    @Column({type: "timestamp"})
    created_at!: Date;

}