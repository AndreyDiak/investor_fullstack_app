import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';

const relativePath = './../assets';

@Injectable()
export class AssetsService<
  D extends Record<PropertyKey, unknown> & { id: number },
> {
  constructor() {}

  add(data: D, filename: string) {
    const parsed = this.read(filename);
    parsed.push({
      ...data,
      id: parsed.length,
    });
    this.save(parsed, filename);
  }

  update(data: D, id: number, filename: string) {
    const parsed = this.read(filename).map((v) => {
      if (v.id === id) {
        return {
          ...data,
          id,
        };
      }
      return v;
    });
    this.save(parsed, filename);
  }

  delete(id: number, filename: string) {
    const parsed = this.read<any>(filename).filter((v) => v.id !== id);
    this.save(parsed, filename);
  }

  read<T extends D>(filename: string) {
    const assets = readFileSync(`${relativePath}/${filename}.json`, {
      encoding: 'utf-8',
    });
    return JSON.parse(assets) as T[];
  }

  save(data: unknown, filename: string) {
    writeFileSync(
      `${relativePath}/${filename}.json`,
      JSON.stringify(data, null, 2),
    );
  }
}
