import { Injectable, NotFoundException } from '@nestjs/common';
import { generateRandomId } from 'helpers/helper';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private profileRpository: Repository<Profile>,
  ) {}
  private profiles = [
    {
      id: generateRandomId(20),
      name: 'Harshit Joshi',
      description: 'The name itself is enough....',
    },
    {
      id: generateRandomId(20),
      name: 'Rahuk Nayak',
      description: 'What the hell I am doing here?',
    },
    {
      id: generateRandomId(20),
      name: 'Harshit Joshi',
      description: 'It is what it is...',
    },
  ];
  async findAll() {
    const allprofiles = await this.profileRpository.find();
    if (!allprofiles?.length) {
      throw new NotFoundException('There are no profiles');
    }
    return allprofiles;
    //return this.profiles;
  }
  async findOne(id: string) {
    const profile = await this.profileRpository.findOne({
      where: { id },
    });
    if (!profile) {
      throw new NotFoundException(`Profile with id ${id} is not found`);
    }
    return profile;
  }
  async createProfile(profile: CreateProfileDTO) {
    console.log('profile', profile);
    /*Prepare the entity */
    const newProfile = this.profileRpository.create({
      id: generateRandomId(20),
      ...profile,
    });
    /*Save into db*/
    await this.profileRpository.save(newProfile);
    //this.profiles.push({ id: generateRandomId(20), ...profile });
    //console.log('updated profiles', this.profiles);
    return newProfile;
  }
  async updateProfile(id: string, profile: UpdateProfileDTO) {
    const existingProfile = await this.profileRpository.findOne({
      where: { id },
    });
    //let updateIndex = this?.profiles?.findIndex((prof) => prof?.id === id);
    if (!existingProfile) {
      throw new NotFoundException(`Profile with id ${id} is not found`);
    }

    const updatedProfile = {
      ...existingProfile,
      ...profile,
    };
    await this.profileRpository.save(updatedProfile);
    //this.profiles[updateIndex] = {
    //  ...updatedProfile,
    //};
    return updatedProfile;
  }
  async deleteProfile(id: string) {
    const profile = await this.profileRpository.findOne({ where: { id } });
    //let deleteProfile = this?.profiles?.find((prof) => prof?.id == id);
    if (!profile) {
      throw new NotFoundException(`Profile with id ${id} is not found`);
    }
    await this.profileRpository.remove(profile);
    //this.profiles = this.profiles.filter((profile) => profile.id !== id);
    return profile;
  }
}
