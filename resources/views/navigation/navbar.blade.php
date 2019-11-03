 <div class="topnav">
        <a class="active" href="/">Strona Główna</a>
     @if (Route::has('login'))
             @auth
        <a href="#news">Przeglądaj</a>
             @endauth
     @endif

        <a href="#contact">Kontakt</a>
        <a href="#about">O Projekcie</a>

     @if (Route::has('login'))
         @auth
         <a href="/logout"><span class="glyphicon glyphicon-log-out"></span> Wyloguj</a>
         @else
         <a href="/login"><span class="glyphicon glyphicon-log-in"></span> Zaloguj  </a>

             @if (Route::has('register'))
         <a href="/register">Zarejestruj</a>
             @endif
         @endauth
     @endif
    </div>
