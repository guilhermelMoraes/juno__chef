import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import Restaurant from "./restaurant.model";

@Entity('restaurants')
class RestaurantEntity implements Omit<Restaurant, 'hoursOfOperation' | 'address'> {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name!: string;

  @Column({
    type: 'varchar',
    length: 700,
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'varchar',
    length: 15,
    unique: true,
  })
  phone!: string;
  
  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  cnpj!: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  owner!: string;

  @Column({
    type: 'varchar',
    length: 200,
    unique: true,
  })
  website?: string;
}

export default RestaurantEntity;
