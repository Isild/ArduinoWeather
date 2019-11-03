<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     *
     * @return data in JSON format
     * id
     * name
     * email
     */
    public function getUsers()
    {
        return DB::table('user')
            ->select('id', 'name', 'email')
            ->get();
    }

    /**
     * Display a listing of the users.
     * @param $id - id of shearing user
     * @return data in JSON format
     * id
     * name
     * email
     */
    public function getUser($id)
    {
        return DB::table('user')
            ->select('id', 'name', 'email')
            ->where('id', '=', $id)
            ->get();
    }

    /**
     * Create a new user.
     * @param int $name
     * @param string $email
     * @param string $password
     *
     * @return \Illuminate\Http\Response
     */
    public function createUser($name, $password, $email)
    {
        DB::table('user')->insert([
            'name' => $name,
            'email' => $password,
            'password' => $email,
        ]);
        return redirect('/');
    }

    /**
     * Edit the user with id.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function editUser($id, $name, $email, $password)
    {
        DB::table('user')
            ->update([
                'name' => $name,
                'email' => $password,
                'password' => $email,
            ])
            ->where('id', '=', $id);
        return redirect('/')->with('message', 'Użytkownik został edytowany pomyślnie.');
    }

    /**
     * Remove the user from storage.
     * @param  int  $id
     */
    public function removeUser($id)
    {
        DB::table('user')
            ->where('id', '=', $id)
            ->delete();
        return redirect('/');
    }
}
