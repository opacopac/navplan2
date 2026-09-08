# Dependency Injection Ansatz (PHP-DI)

Dieses Dokument beschreibt, wie PHP-DI in Navplan2 verwendet wird, warum das vom
"Standard"-PHP-DI-Gebrauch abweicht, und was die Alternative wäre. Ziel: zukünftigen
Entwicklern (und AI-Coding-Assistenten) den bewussten Architekturentscheid erklären,
damit er nicht versehentlich als "Fehler" refactored wird.

## Aktueller Ansatz (Stand: hybrides Muster, seit Migration von Config/System/Persistence/Webcam/Navaid)

Wir kombinieren jetzt beide vorherigen Ansätze, um Boilerplate zu reduzieren und
gleichzeitig explizite Modulgrenzen zu behalten:

- Jedes Modul behält sein `I<Feature>DiContainer`-Interface (die öffentliche API /
  Modulgrenze bleibt unverändert).
- Statt einer `Prod<Feature>DiContainer`-Klasse mit eigenem privaten PHP-DI
  `Container` liefert jedes (migrierte) Modul nur noch eine reine
  **Definitionsdatei** `<feature>.definitions.php` (z.B. `Navaid/navaid.definitions.php`),
  die ein Array von `interface => autowire(Implementierung)`-Bindungen zurückgibt.
- `ProdNavplanDiContainer` baut **einen einzigen** applikationsweiten PHP-DI
  `Container`, lädt alle `*.definitions.php`-Dateien hinein, und **implementiert
  die `I<Feature>DiContainer`-Interfaces der migrierten Module direkt** – jede
  Methode ist ein Einzeiler-Delegat auf `$this->container->get(...)`.
- Für Rückwärtskompatibilität (`$diContainer->getXxxDiContainer()->getYyy()`)
  gab es früher `getXxxDiContainer()`-Fassadenmethoden, die nur `return $this;`
  zurückgaben (da `ProdNavplanDiContainer` das Interface selbst implementiert).
  Diese Indirektion wurde entfernt, nachdem ALLE Module migriert waren - alle
  Aufrufstellen (REST-Entrypoints `<Feature>.php`, Konsolen-Skripte) rufen die
  Getter jetzt direkt auf `$diContainer` auf, z.B.
  `$diContainer->getNavaidController()` statt
  `$diContainer->getNavaidDiContainer()->getNavaidController()`. Einzige
  Ausnahme: `getConfigDiContainer()` bleibt bestehen, da `IConfigDiContainer`
  bewusst NICHT von `ProdNavplanDiContainer` implementiert wird (s.u.) und
  daher einen echten Container-Lookup braucht.
- Noch nicht migrierte Module funktionieren unverändert über ihre bisherige
  `Prod<Feature>DiContainer`-Klasse (per Factory-Closure im selben Container
  registriert) – beide Stile koexistieren problemlos im selben Container.

### Wichtige Stolperfallen bei der Migration

1. **Kollision bei geteilten Interfaces:** Alle Module binden ihren Controller an
   das gemeinsame `IRestController`-Interface. Werden alle Definitionsdateien in
   **einen** Container gemischt, überschreiben sich diese Bindings gegenseitig
   (letzter geladener Definitionsblock gewinnt)! Lösung: migrierte Module binden
   ihren Controller an die **konkrete Klasse** (`NavaidController::class`,
   `WebcamController::class`, ...) statt an `IRestController::class`. Die
   `getXxxController(): IRestController`-Fassadenmethode löst dann gezielt über
   die konkrete Klasse auf.
2. **Selbstregistrierung ohne Rekursion (historisch, während der Migration):**
   Solange noch nicht alle Module migriert waren, mussten deren Factory-
   Closures (z.B. `$c->get(ISystemDiContainer::class)->getHttpService()`)
   weiter funktionieren - dazu wurde `ISystemDiContainer::class => $this`
   (usw.) im Container registriert. Unkritisch, solange die implementierten
   Methoden auf **andere** Container-Keys delegieren (z.B. `IHttpService::class`),
   nie wieder auf den eigenen `I<Feature>DiContainer::class`-Key – sonst
   Endlosrekursion. Jetzt, wo ALLE Module migriert sind, gibt es keine
   Factory-Closures mehr, die das bräuchten - die komplette
   Selbstregistrierungs-Liste wurde deshalb aus dem Konstruktor entfernt
   (kein Code irgendwo tut `$c->get(I<Feature>DiContainer::class)` mehr;
   die `getXxxDiContainer()`-Fassadenmethoden geben direkt `return $this;`
   zurück, ohne über den Container zu gehen). Falls in Zukunft wieder ein
   nicht-migriertes Modul hinzukommt, muss dieses Muster erneut eingeführt
   werden.
3. **Nicht jedes Interface lohnt sich zum Flatten:** `IConfigDiContainer` erweitert
   ~10 schmale Config-Interfaces mit insgesamt ~13 Gettern. Diese 1:1 auf
   `ProdNavplanDiContainer` zu duplizieren wäre reines Boilerplate ohne Nutzen,
   da `IniFileConfig` (direkt als `IConfigDiContainer` in `config.definitions.php`
   gebunden) schon eine einfache Implementierung ganz ohne eigenen
   PHP-DI-Container bzw. Wrapper-Klasse ist - es implementiert bereits alle
   Teil-Interfaces, die `IConfigDiContainer` zusammenfasst, direkt. Hier bleibt
   `getConfigDiContainer()` einfach bei
   `return $this->container->get(IConfigDiContainer::class);` (liefert die echte
   `IniFileConfig`-Instanz, kein Flatten nötig). Die frühere `ProdConfigDiContainer`-
   Wrapper-Klasse (reines Pass-Through auf `IniFileConfig`, ohne Mehrwert) wurde
   deshalb gelöscht.

### Migrationsstatus

Migriert (definitions.php + auf `ProdNavplanDiContainer` geflacht): `Config`
(nur Definitionsdatei, kein Flatten – s.o.), `System`, `Persistence`, `Webcam`,
`Navaid`, `Admin`, `Aerodrome`, `AerodromeChart`, `AerodromeCircuit`,
`AerodromeReporting`, `Aircraft`, `Airspace`, `Exporter`, `Flightroute`,
`Geoname`, `MetarTaf`, `MeteoForecast`, `MeteoGram`, `MeteoRadar`, `MeteoSma`,
`Notam`, `OpenAip`, `Search`, `Terrain`, `Track`, `Traffic`, `User`,
`VerticalMap`.

Alle Module sind migriert - es gibt aktuell kein Modul mehr im alten
"eigener `Prod<Feature>DiContainer` mit privatem Container"-Muster. Neue
Module sollten direkt im neuen (definitions.php + Flatten) Muster angelegt
werden.

Temporäre "Bridge"-Definitionen in `ProdNavplanDiContainer`: aktuell keine
mehr nötig (die letzten beiden, `IUserService` und `ISearchUserPointUc` für
`User`, wurden bei der `User`-Migration gelöscht, da `user.definitions.php`
diese Interfaces jetzt selbst bindet). Falls in Zukunft ein neues,
noch-nicht-migriertes Modul hinzukommt, das von einem migrierten Modul
autowired werden muss, folgt hier wieder das gleiche Bridge-Muster.

### Nach jeder Migrationsrunde: unbenutzte Facade-Getter prüfen

Nach dem Flatten eines Moduls lohnt es sich, `grep` über den produktiven Code
(REST-Entrypoints, Konsolen-Skripte, Konstruktoren anderer Module) laufen zu
lassen, um zu prüfen, welche `I<Feature>DiContainer`-Methoden wirklich von
außen aufgerufen werden. Nicht benutzte Getter (nur intern für Autowiring
gebraucht, z.B. weil eine Klasse die Abhängigkeit direkt per Constructor-
Injection bekommt) können aus dem Interface **und** aus
`ProdNavplanDiContainer` entfernt werden – die zugrunde liegende Bindung in der
`*.definitions.php` bleibt bestehen, falls intern noch gebraucht.


## Frühere Zwischenstufe: reine Container-Kapselung pro Domäne (überholt)

Vor der obigen Vereinheitlichung hatte jede Domäne einen eigenen, in sich
gekapselten PHP-DI-`Container`, versteckt hinter der `Prod<Feature>DiContainer`-
Klasse:
- ein `I<Feature>DiContainer`-Interface mit expliziten `getXxx(): IXxx`-Methoden
  (das ist die öffentliche API des Moduls)
- eine `Prod<Feature>DiContainer`-Klasse, die intern einen eigenen PHP-DI `Container`
  aufbaut (`ContainerBuilder` + `addDefinitions([...])`) und die `getXxx()`-Methoden
  einfach an `$this->container->get(IXxx::class)` delegiert

Beispiel: `Navaid/ProdNavaidDiContainer.php`
```php
class ProdNavaidDiContainer implements INavaidDiContainer
{
    private Container $container;

    public function __construct(ILoggingService $loggingService, IDbService $dbService, IHttpService $httpService)
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            ILoggingService::class => $loggingService,
            IDbService::class => $dbService,
            IHttpService::class => $httpService,
            INavaidService::class => autowire(NavaidService::class),
            IRestController::class => autowire(NavaidController::class),
            // ...
        ]);
        $this->container = $builder->build();
    }

    public function getNavaidService(): INavaidService
    {
        return $this->container->get(INavaidService::class);
    }
    // ...
}
```

Die Top-Level-Klasse `ProdNavplanDiContainer` verdrahtet alle Domänen-Container
untereinander (z.B. `Notam` braucht `Airspace` und `Aerodrome`), indem sie
`getXxxDiContainer()`-Aufrufe verkettet – ebenfalls über einen eigenen PHP-DI
`Container` mit Factory-Closures pro Sub-Container-Interface.

Der REST-Entrypoint (`Navaid/Navaid.php`) greift dann so zu:
```php
$controller = $diContainer->getNavaidDiContainer()->getNavaidController();
```

## "Standard"-PHP-DI-Ansatz zum Vergleich

PHP-DI ist eigentlich dafür gedacht, dass es **einen einzigen Container pro
Applikation** gibt:

1. Jedes Modul liefert nur eine reine Definitionsliste, keine eigene Klasse/keinen
   eigenen Container:
   ```php
   // Navaid/navaid.definitions.php
   return [
       INavaidService::class => autowire(NavaidService::class),
       NavaidController::class => autowire(),
       // ...
   ];
   ```
2. Ein zentrales Bootstrap lädt alle `*.definitions.php`-Dateien in **einen**
   Container:
   ```php
   $builder = new DI\ContainerBuilder();
   foreach (glob(__DIR__ . '/../src/Navplan/*/*.definitions.php') as $file) {
       $builder->addDefinitions($file);
   }
   $container = $builder->build();
   ```
3. Entrypoints holen sich Objekte direkt aus diesem einen Container:
   ```php
   $controller = $container->get(NavaidController::class);
   ```

Kein `IXxxDiContainer`-Interface, keine `getXxxDiContainer()`-Verkettung nötig –
Autowiring löst Abhängigkeiten querbeet über alle Module hinweg automatisch auf.

## Vergleich

| Aspekt | reine Container-Kapselung (überholt) | Hybrid (aktuell) | PHP-DI "Standard" |
|---|---|---|---|
| Anzahl Container | 1 pro Domäne + 1 Top-Level | 1 für die ganze App | 1 für die ganze App |
| Verdrahtung zwischen Domänen | über `getXxxDiContainer()`-Ketten auf separaten Containern | direkt im selben Container (Autowiring), Fassade bleibt bestehen | automatisch, keine Fassade |
| Domänen-API | explizites `IXxxDiContainer`-Interface | explizites `IXxxDiContainer`-Interface, direkt von `ProdNavplanDiContainer` implementiert | keine – `$container->get(Klasse::class)` überall möglich |
| Neue Abhängigkeit hinzufügen | ggf. Top-Level-Container anpassen | meist nichts zu tun (Autowiring) | meist nichts zu tun (Autowiring) |
| Boilerplate | viel (Interface + eigene Container-Klasse pro Modul) | wenig (nur Definitionsdatei pro Modul + Einzeiler-Delegate auf einer Klasse) | am wenigsten |
| Modulgrenzen | explizit erzwungen | explizit erzwungen | nur durch Disziplin |
| Performance | mehrere kleine Container-Builds pro Request | ein Container-Build | ein Container-Build |

## Warum wir beim hybriden Ansatz bleiben (und nicht zum "Standard" wechseln)

Der "Standard"-Ansatz hat keine Modul-Fassade – jede Klasse aus jedem Modul ist
überall per `$container->get(Klasse::class)` erreichbar. Das passt nicht zur in
`copilot-instructions.md` beschriebenen Struktur nach Business-Domänen, die
verhindern soll, dass Domänen ungewollt querbeet auf interne
Implementierungsklassen anderer Domänen zugreifen.

Das hybride Muster gibt uns das Beste aus beiden Welten: **ein** Container (weniger
Boilerplate, automatische Verdrahtung über Modulgrenzen hinweg, kompilierbar/
cachebar für Produktion), aber weiterhin **explizite, erzwungene Modulgrenzen**
über die `I<Feature>DiContainer`-Interfaces.

**Konsequenz für zukünftige Änderungen:** Bei der Migration weiterer Module auf
dieses Muster immer die drei Stolperfallen oben beachten (Controller-Kollision,
Selbstregistrierungs-Rekursion, "lohnt sich Flatten?"). Nicht versehentlich zum
"einen globalen Container ohne Modul-Interfaces"-Standardmuster wechseln, außer
dies wird explizit gewünscht.
