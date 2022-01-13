
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({name:'search-log'})
export class SearchLogEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id : string;


    @Column()
    user_name : string;

    @Column()
    dept_id : string;

    @Column()
    dept_name : string;

    @Column()
    role_id : string;

    @Column()
    role_name : string;

    @Column()
    search_keyword : string;

    @Column()
    search_date : Date;

    @Column()
    short_statement : string;

    @Column()
    item_id : string;

    @Column()
    item_name : string;

    @Column()
    item_upload_date : Date;

    @Column()
    item_category : string;

    @Column()
    item_overview : string;
}
