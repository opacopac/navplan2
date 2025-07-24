<?php declare(strict_types=1);

namespace NavplanTest\System\DbQueryBuilder\MySql;

use Navplan\System\DbQueryBuilder\Domain\Model\DbColType;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbInsertCommandBuilder;
use NavplanTest\System\Db\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


class MySqlDbInsertCommandBuilderTest extends TestCase
{
    private MySqlDbInsertCommandBuilder $insertCommandBuilder;
    private MockDbService $mockDbService;


    protected function setUp(): void
    {
        parent::setUp();

        $this->mockDbService = new MockDbService();
        $this->insertCommandBuilder = MySqlDbInsertCommandBuilder::create($this->mockDbService);
    }


    public function test_insert_into()
    {
        // given
        $t = new DbTable("test_table", null);
        $c1 = $t->addCol("col1", DbColType::STRING);
        $qb = $this->insertCommandBuilder
            ->insertInto($t)
            ->setValue($c1, "value1");

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("INSERT INTO test_table (col1) VALUES ('value1')", $query);
    }


    public function test_insert_into_with_multiple_columns_and_values()
    {
        // given
        $t = new DbTable("test_table", null);
        $c1 = $t->addCol("col1", DbColType::STRING);
        $c2 = $t->addCol("col2", DbColType::STRING);
        $qb = $this->insertCommandBuilder
            ->insertInto($t)
            ->setValue($c1, "value1")
            ->setValue($c2, "value2");

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("INSERT INTO test_table (col1, col2) VALUES ('value1', 'value2')", $query);
    }


    public function test_insert_with_table_alias_is_ignored()
    {
        // given
        $t = new DbTable("test_table", "t1");
        $c1 = $t->addCol("col1", DbColType::STRING);
        $qb = $this->insertCommandBuilder
            ->insertInto($t)
            ->setValue($c1, "value1");

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("INSERT INTO test_table (col1) VALUES ('value1')", $query);
    }
}
