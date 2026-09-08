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
  bleiben die `getXxxDiContainer()`-Fassadenmethoden bestehen, geben aber nur noch
  `return $this;` zurück (da `ProdNavplanDiContainer` das Interface jetzt selbst
  implementiert).
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
2. **Selbstregistrierung ohne Rekursion:** Damit noch nicht migrierte Module
   (deren Factory-Closures z.B. `$c->get(ISystemDiContainer::class)->getHttpService()`
   aufrufen) weiter funktionieren, wird `ISystemDiContainer::class => $this` (usw.)
   im Container registriert. Das ist unkritisch, solange die implementierten
   Methoden auf **andere** Container-Keys delegieren (z.B. `IHttpService::class`),
   nie wieder auf den eigenen `I<Feature>DiContainer::class`-Key – sonst
   Endlosrekursion.
3. **Nicht jedes Interface lohnt sich zum Flatten:** `IConfigDiContainer` erweitert
   ~10 schmale Config-Interfaces mit insgesamt ~13 Gettern. Diese 1:1 auf
   `ProdNavplanDiContainer` zu duplizieren wäre reines Boilerplate ohne Nutzen,
   da `ProdConfigDiContainer` schon eine einfache Implementierung ganz ohne
   eigenen PHP-DI-Container ist. Hier bleibt `getConfigDiContainer()` einfach bei
   `return $this->container->get(IConfigDiContainer::class);` (liefert die echte
   `ProdConfigDiContainer`-Instanz, kein Flatten nötig).

### Migrationsstatus

Migriert (definitions.php + auf `ProdNavplanDiContainer` geflacht): `Config`
(nur Definitionsdatei, kein Flatten – s.o.), `System`, `Persistence`, `Webcam`,
`Navaid`, `Admin`, `Aerodrome`, `AerodromeChart`, `AerodromeCircuit`,
`AerodromeReporting`, `Aircraft`, `Airspace`, `Exporter`, `Flightroute`,
`Geoname`, `MetarTaf`, `MeteoForecast`, `MeteoGram`, `MeteoRadar`, `MeteoSma`,
`Notam`.

Noch im alten Muster (eigene `Prod<Feature>DiContainer`-Klasse mit privatem
Container, per Factory-Closure verdrahtet): `OpenAip`, `Search`,
`Terrain`, `Track`, `Traffic`, `User`, `VerticalMap`. Migration ist rein
mechanisch (siehe Muster oben) und kann modulweise nachgezogen werden.

Temporäre "Bridge"-Definitionen in `ProdNavplanDiContainer` (für migrierte
Module, die noch eine Abhängigkeit auf ein NICHT migriertes Modul autowiren
müssen): `IUserService` (→ `User`), `IOpenAipImporter` (→ `OpenAip`),
`ITerrainService` (→ `Terrain`, gebraucht von `Geoname`). Sobald das jeweilige
Modul migriert ist, kann die Bridge gelöscht werden (das migrierte Modul liefert
die Bindung dann selbst über seine eigene `*.definitions.php`).

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
