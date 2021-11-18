import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { EmploymentType } from "src/enums/employment-type.enum";

export class ExperienceDto {
    @IsString()
    title: string;

    @IsString()
    company: string;

    @IsOptional()
    @IsEnum(EmploymentType)
    employmentType: EmploymentType;

    @IsOptional()
    @IsString()
    location: string;

    @IsOptional()
    @IsString()
    startDate: string;

    @IsOptional()
    @IsString()
    endDate: String;

    @IsOptional()
    @IsString()
    description: string;
}