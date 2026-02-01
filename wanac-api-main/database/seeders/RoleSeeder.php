<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            'admin',
            'client',
            'coach'
        ];

        foreach ($roles as $role) {
            $check = Role::where('name', $role)->first();

            if (empty($check)) {
                Role::create([
                    'name' => $role
                ]);
            }
        }
    }
}
