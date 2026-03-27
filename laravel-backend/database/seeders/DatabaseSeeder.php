<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

/**
 * Seeder principal que ejecuta todos los seeders
 */
class DatabaseSeeder extends Seeder
{
    /**
     * Poblar la base de datos
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            EquipoSeeder::class,
            JugadorSeeder::class,
            LigaSeeder::class,
            PartidoSeeder::class,
        ]);
    }
}
