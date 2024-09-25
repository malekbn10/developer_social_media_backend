import {Column,DeleteDateColumn, Entity} from "typeorm";
@Entity()
export class User {
    @Column({primary:true,generated:true})
    id : number;
    @Column({length:25})
    firstName : string;
    @Column({length:25})
    lasttName : string;
    @Column({unique:true,nullable:false})
    email:string;
    @Column({nullable:false})
    password:string;
    @Column({length:255})
    bio:string;
    @Column({length:255})
    image:string;
    @Column()
    links:string;
    @Column()
    projects:string;
    @Column({default:"user"})
    role:string;
    @DeleteDateColumn()
    deletedAt:string;
}
