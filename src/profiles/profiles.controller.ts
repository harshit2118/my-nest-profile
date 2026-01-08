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
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { generateRandomId } from 'helpers/helper';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { ProfilesService } from './profiles.service';
import { BaseExceptionFilter } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseFilters(BaseExceptionFilter)
@Controller('profiles')
export class ProfilesController {
  constructor(private profileService: ProfilesService) {}
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.profileService.findOne(id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body(new ValidationPipe()) createProfileDto: CreateProfileDTO) {
    return this.profileService.createProfile(createProfileDto);
    //return {
    //  name: createProfileDto?.name,
    //  description: createProfileDto?.description,
    //  id: generateRandomId(15) || '56',
    //};
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDTO) {
    return this.profileService.updateProfile(id, updateProfileDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  //@HttpCode(HttpStatus.NO_CONTENT)
  //@HttpCode(204)
  remove(@Param('id') id: string) {
    return this.profileService.deleteProfile(id);
  }
}
