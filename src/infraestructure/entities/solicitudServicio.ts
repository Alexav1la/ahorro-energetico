import { create } from "domain";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("SolicitudServicio")
export class SolicitudServicio {
    @PrimaryGeneratedColumn ()
    id_requerimiento!: number;

    @Column({ type: "int" })
    apartament_id!: number;

    @Column({ type: "varchar", length: 100 })
    tipo_solicitud!: string;

    @Column({ type: "varchar", length: 100 })
    title!: string;

    @Column({ type: "varchar", length: 100 })
    prioridad!: string;

    @Column({ type: "varchar", length: 100, default: "pending" })
    status!: string;

    @CreateDateColumn({ type: "timestamp" })
    create_at!: Date;

    @UpdateDateColumn({ type: "timestamp" })
    update_at!: Date;

    @Column({ type: "timestamp", nullable: true })
    resolve_at?: Date;

    @Column({ type: "varchar", length: 100, nullable: true })
    assigned_to?: string;

    @Column({ type: "text", nullable: true })
    resolucion_notes?: string;

}