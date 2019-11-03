<!-- Sekcja wyświetlająca błędy jeśli istnieją -->
@if ($errors->any())
    <center>
        <div class="flash alert-danger">
            @foreach ($errors->all() as $error)
                <p>{{ $error  }}</p>
            @endforeach
        </div>
    </center>
@endif
