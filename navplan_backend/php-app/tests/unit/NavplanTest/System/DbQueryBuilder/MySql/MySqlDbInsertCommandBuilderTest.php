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


    public function test_build_bind_statement_types_for_standard_types()
    {
        // given
        $t = new DbTable("test_table", null);
        $c1 = $t->addCol("col1", DbColType::STRING);
        $c2 = $t->addCol("col2", DbColType::INT);
        $c3 = $t->addCol("col3", DbColType::DOUBLE);
        $c4 = $t->addCol("col4", DbColType::BOOL);
        $c5 = $t->addCol("col5", DbColType::TIMESTAMP);
        $c6 = $t->addCol("col6", DbColType::GEOMETRY);
        $c7 = $t->addCol("col7", DbColType::GEO_POINT);
        $qb = $this->insertCommandBuilder
            ->insertInto($t)
            ->setValue($c1, "value1")
            ->setValue($c2, 123)
            ->setValue($c3, 45.67)
            ->setValue($c4, true)
            ->setValue($c5, "2023-10-01 12:00:00")
            ->setValue($c6, "POINT(1 2)")
            ->setValue($c7, "POINT(3 4)");

        // when
        $types = $qb->buildBindParamTypes();

        // then
        $this->assertEquals("sidisss", $types);
    }


    public function test_build_prepared_statement()
    {
        // given
        $t = new DbTable("test_table", null);
        $c1 = $t->addCol("col1", DbColType::STRING);
        $c2 = $t->addCol("col2", DbColType::INT);
        $qb = $this->insertCommandBuilder
            ->insertInto($t)
            ->setValue($c1, "value1")
            ->setValue($c2, 123);

        // when
        $statementStr = $qb->build(true);

        // then
        $this->assertEquals("INSERT INTO test_table (col1, col2) VALUES (?, ?)", $statementStr);
    }


    public function test_build_prepared_statement_for_geo_types()
    {
        // given
        $t = new DbTable("test_table", null);
        $c1 = $t->addCol("col1", DbColType::GEOMETRY);
        $c2 = $t->addCol("col2", DbColType::GEO_POINT);
        $c3 = $t->addCol("col3", DbColType::STRING);
        $qb = $this->insertCommandBuilder
            ->insertInto($t)
            ->setValue($c1, "POINT(1 2)")
            ->setValue($c2, "POINT(3 4)")
            ->setValue($c3, "value3");

        // when
        $statementStr = $qb->build(true);

        // then
        $this->assertEquals("INSERT INTO test_table (col1, col2, col3) VALUES (ST_GeomFromText(?), ST_GeomFromText(?), ?)", $statementStr);
    }
}
