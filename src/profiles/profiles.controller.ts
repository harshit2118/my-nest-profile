import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { generateRandomId } from 'helpers/helper';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
import { BaseExceptionFilter } from '@nestjs/core';

@UseFilters(BaseExceptionFilter)
@Controller('profiles')
export class ProfilesController {
  constructor(private profileService: ProfilesService) {}
  @Get()
  findAll() {
    return this.profileService.findAll();
  }
  //findAll(@Query('age', ParseIntPipe) age: number) {
  //  return [
  //    {
  //      age,
  //    },
  //  ];
  //}
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.profileService.findOne(id);
  }
  @Post()
  create(@Body(new ValidationPipe()) createProfileDto: CreateProfileDTO) {
    return this.profileService.createProfile(createProfileDto);
    //return {
    //  name: createProfileDto?.name,
    //  description: createProfileDto?.description,
    //  id: generateRandomId(15) || '56',
    //};
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDTO) {
    return this.profileService.updateProfile(id, updateProfileDto);
  }
  @Delete(':id')
  //@HttpCode(HttpStatus.NO_CONTENT)
  //@HttpCode(204)
  remove(@Param('id') id: string) {
    return this.profileService.deleteProfile(id);
  }
}
