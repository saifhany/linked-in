import { IsDateString, IsOptional, IsString } from "class-validator";

export class EducationDto {
    @IsString()
    school: string;

    @IsOptional()
    @IsString()
    degree: string;

    @IsOptional()
    @IsString()
    fieldOfStudy: string;

    @IsOptional()
    @IsString()
    startDate: string;

    @IsOptional()
    @IsString()
    endDate: string;

    @IsOptional()
    @IsString()
    grade: string;

    @IsOptional()
    @IsString()
    description: string;
}