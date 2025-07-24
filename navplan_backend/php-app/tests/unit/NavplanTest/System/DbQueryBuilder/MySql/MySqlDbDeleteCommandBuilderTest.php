<?php declare(strict_types=1);

namespace NavplanTest\System\DbQueryBuilder\MySql;

use Navplan\System\DbQueryBuilder\Domain\Model\DbColType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbDeleteCommandBuilder;
use NavplanTest\System\Db\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


class MySqlDbDeleteCommandBuilderTest extends TestCase
{
    private MySqlDbDeleteCommandBuilder $deleteCommandBuilder;
    private MockDbService $mockDbService;


    protected function setUp(): void
    {
        parent::setUp();

        $this->mockDbService = new MockDbService();
        $this->deleteCommandBuilder = MySqlDbDeleteCommandBuilder::create($this->mockDbService);
    }


    public function test_delete_from()
    {
        // given
        $t = new DbTable("test_table", null);
        $t->addCol("col1", DbColType::STRING);
        $qb = $this->deleteCommandBuilder
            ->deleteFrom($t);

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("DELETE FROM test_table", $query);
    }


    public function test_delete_from_with_where_equals()
    {
        // given
        $t = new DbTable("test_table", null);
        $c1 = $t->addCol("col1", DbColType::STRING);
        $qb = $this->deleteCommandBuilder
            ->deleteFrom($t)
            ->whereEquals($c1, "test_value");

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("DELETE FROM test_table WHERE col1 = 'test_value'", $query);
    }


    public function test_delete_from_with_where()
    {
        // given
        $t = new DbTable("test_table", "t1");
        $c1 = $t->addCol("col1", DbColType::STRING);
        $qb = $this->deleteCommandBuilder
            ->deleteFrom($t)
            ->where(DbCondSimple::create($c1, DbCondOp::GT, "100"));

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("DELETE FROM test_table AS t1 WHERE t1.col1 > '100'", $query);
    }
}
