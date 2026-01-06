<?php declare(strict_types=1);

namespace NavplanTest\Notam\IcaoImporter;

use Navplan\Notam\IcaoImporter\NotamAirspaceParser;
use Navplan\System\Domain\Service\ILoggingService;
use Navplan\System\Db\Domain\Service\IDbService;
use PHPUnit\Framework\TestCase;


class NotamAirspaceParserTest extends TestCase
{
    private ILoggingService $logger;
    private IDbService $dbService;
    private NotamAirspaceParser $parser;


    protected function setUp(): void
    {
        $this->logger = $this->createMock(ILoggingService::class);
        $this->dbService = $this->createMock(IDbService::class);
        $this->parser = new NotamAirspaceParser($this->logger, $this->dbService);
    }


    public function test_it_is_instantiable()
    {
        $this->assertInstanceOf(NotamAirspaceParser::class, $this->parser);
    }
}
