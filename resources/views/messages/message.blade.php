<!-- Sekcja wyświetlająca wiadomości jeśli istnieją -->
@if (Session::has('message'))
    <div class="flash alert-info">
        <center>
            <p>{{ Session::get('message')  }}</p>
        </center>
    </div>
@endif
