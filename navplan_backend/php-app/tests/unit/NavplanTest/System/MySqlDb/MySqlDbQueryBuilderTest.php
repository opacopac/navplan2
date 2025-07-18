<?php declare(strict_types=1);

namespace NavplanTest\System\MySqlDb;

use Navplan\System\MySqlDb\MySqlDbQueryBuilder;
use NavplanTest\System\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


class MySqlDbQueryBuilderTest extends TestCase
{
    private MysqlDbQueryBuilder $mySqlDbQueryBuilder;


    protected function setUp(): void
    {
        parent::setUp();

        $mockDbService = new MockDbService();
        $this->mySqlDbQueryBuilder = new MySqlDbQueryBuilder($mockDbService);
    }


    public function test_simple_select()
    {
        // given
        $qb = $this->mySqlDbQueryBuilder
            ->selectAllFrom("test_table")
            ->whereEquals("col1", "value1");

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("SELECT * FROM test_table WHERE col1 = 'value1'", $query);
    }
}
