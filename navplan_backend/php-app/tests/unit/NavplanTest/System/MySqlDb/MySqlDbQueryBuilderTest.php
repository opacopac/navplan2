<?php declare(strict_types=1);

namespace NavplanTest\System\MySqlDb;

use Navplan\System\Domain\Model\DbException;
use Navplan\System\MySqlDb\MySqlDbService;
use PHPUnit\Framework\TestCase;


class MySqlDbQueryBuilderTest extends TestCase
{
    /*private MySqlDbService $dbService;


    private function getDbService(): MySqlDbService
    {
        return $this->dbService;
    }


    protected function setUp(): void
    {
        global $db_host, $db_user, $db_pw, $db_name;
        parent::setUp();

        $this->dbService = MySqlDbService::getInstance();
        $this->getDbService()->init($db_host, $db_user, $db_pw, $db_name);
    }


    // region openDb

    public function test_openDb_success()
    {
        $this->assertFalse($this->getDbService()->isOpen());
        $this->getDbService()->openDb();
        $this->assertTrue($this->getDbService()->isOpen());
    }


    public function test_openDb_error()
    {
        $this->getDbService()->init('xxx', 'xxx', 'xxx', 'xxx');
        $this->expectException(DbException::class);
        $this->getDbService()->openDb();
    }

    // endregion
    */
}
