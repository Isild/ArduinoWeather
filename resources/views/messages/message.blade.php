<!-- Sekcja wyświetlająca wiadomości jeśli istnieją -->
@if (Session::has('message'))
    <div class="flash alert-info">
        <p>{{ Session::get('message')  }}</p>
    </div>
@endif
