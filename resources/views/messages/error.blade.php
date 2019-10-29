<!-- Sekcja wyświetlająca błędy jeśli istnieją -->
@if ($errors->any())
    <div class="flash alert-danger">
        @foreach ($errors->all() as $error)
            <p>{{ $error  }}</p>
        @endforeach
    </div>
@endif
