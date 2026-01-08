import { Injectable, NotFoundException } from '@nestjs/common';
import { generateRandomId } from 'helpers/helper';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
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
  findAll() {
    return this.profiles;
  }
  findOne(id: string) {
    if (!this?.profiles?.find((profile) => profile?.id == id)) {
      throw new NotFoundException(`Profile with id ${id} is not found`);
    }
    return this?.profiles?.find((profile) => profile?.id == id);
  }
  createProfile(profile: CreateProfileDTO) {
    console.log('profile', profile);
    this.profiles.push({ id: generateRandomId(20), ...profile });
    console.log('updated profiles', this.profiles);
    return this.profiles;
  }
  updateProfile(id: string, profile: UpdateProfileDTO) {
    let updateIndex = this?.profiles?.findIndex((prof) => prof?.id === id);
    if (updateIndex === -1) {
      throw new NotFoundException(`Profile with id ${id} is not found`);
    }

    let updatedProfile = {
      ...this.profiles[updateIndex],
      ...profile,
    };
    this.profiles[updateIndex] = {
      ...updatedProfile,
    };
    return updatedProfile;
  }
  deleteProfile(id: string) {
    let deleteProfile = this?.profiles?.find((prof) => prof?.id == id);
    if (!deleteProfile) {
      throw new NotFoundException(`Profile with id ${id} is not found`);
    }

    this.profiles = this.profiles.filter((profile) => profile.id !== id);
    return deleteProfile;
  }
}
