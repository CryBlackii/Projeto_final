import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from "typeorm";
import Game from "../../../games/typeorm/entities/Game";

@Entity('developer')
export default class Developer {
  @PrimaryGeneratedColumn()
  id: number;
    @Column()
    name: string;
    
    @Column()
    pais_de_origem: string;
    
    @Column({ type: 'date' })
    fundacao: Date;
    
    @Column()
    sede: string;
    
    @Column()
    site: string;
    
    @OneToMany(() => Game, game => game.developer)
    games: Game[]; 
    
    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
}