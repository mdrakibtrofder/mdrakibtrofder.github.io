import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsMongoId,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from "class-validator";
import { SECTION_KINDS } from "./schemas/section.schema";

const KEY_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const KEY_MESSAGE = "key must be lowercase letters, numbers and dashes (it becomes the URL anchor)";
const ACCENTS = ["neutral", "academic", "engineering"];

export class CreateSectionDto {
  @IsString() @Matches(KEY_PATTERN, { message: KEY_MESSAGE }) @MaxLength(60)
  key: string;

  @IsIn(SECTION_KINDS as unknown as string[])
  kind: string;

  @IsString() @MaxLength(200)
  title: string;

  @IsOptional() @IsString() chapter?: string;
  @IsOptional() @IsString() @MaxLength(60) navLabel?: string;
  @IsOptional() @IsString() @MaxLength(60) eyebrow?: string;
  @IsOptional() @IsString() @MaxLength(2000) description?: string;
  @IsOptional() @IsIn(ACCENTS) accent?: string;
  @IsOptional() @IsBoolean() visible?: boolean;
  @IsOptional() @IsObject() options?: Record<string, unknown>;
}

/** Kind is fixed after creation because items are shaped for it. */
export class UpdateSectionDto {
  @IsOptional() @IsString() @Matches(KEY_PATTERN, { message: KEY_MESSAGE }) @MaxLength(60) key?: string;
  @IsOptional() @IsString() @MaxLength(200) title?: string;
  @IsOptional() @IsString() chapter?: string;
  @IsOptional() @IsString() @MaxLength(60) navLabel?: string;
  @IsOptional() @IsString() @MaxLength(60) eyebrow?: string;
  @IsOptional() @IsString() @MaxLength(2000) description?: string;
  @IsOptional() @IsIn(ACCENTS) accent?: string;
  @IsOptional() @IsBoolean() visible?: boolean;
  @IsOptional() @IsObject() options?: Record<string, unknown>;
}

export class ReorderDto {
  @IsArray() @ArrayNotEmpty() @IsMongoId({ each: true })
  ids: string[];
}

export class CreateItemDto {
  @IsObject() data: Record<string, unknown>;
  @IsOptional() @IsBoolean() visible?: boolean;
  /** Insert position; defaults to the end. */
  @IsOptional() @IsInt() order?: number;
}

export class UpdateItemDto {
  @IsOptional() @IsObject() data?: Record<string, unknown>;
  @IsOptional() @IsBoolean() visible?: boolean;
}

export class UpdateSettingsDto {
  @IsOptional() @IsObject() profile?: Record<string, unknown>;
  @IsOptional() @IsArray() chapters?: Record<string, unknown>[];
}
