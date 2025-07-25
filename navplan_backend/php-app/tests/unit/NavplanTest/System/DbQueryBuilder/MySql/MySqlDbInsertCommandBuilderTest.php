<?php declare(strict_types=1);

namespace NavplanTest\System\DbQueryBuilder\MySql;

use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;
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
        $c2 = $t->addCol("col2", DbColType::INT);
        $c3 = $t->addCol("col3", DbColType::DOUBLE);
        $c4 = $t->addCol("col4", DbColType::BOOL);
        $qb = $this->insertCommandBuilder
            ->insertInto($t)
            ->addCol($c1, "value1")
            ->addCol($c2, 123)
            ->addCol($c3, 45.67)
            ->addCol($c4, true);

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("INSERT INTO test_table (col1, col2, col3, col4) VALUES ('value1', 123, 45.67, 1)", $query);
    }


    public function test_insert_into_with_geo_columns()
    {
        // given
        $pos1 = new Position2d(7, 47);
        $pos2 = new Position2d(8, 48);
        $pos3 = new Position2d(9, 49);
        $line = new Line2d([$pos1, $pos2]);
        $ring = new Ring2d([$pos1, $pos2, $pos3, $pos1]);
        $t = new DbTable("test_table", null);
        $c1 = $t->addCol("col1", DbColType::GEO_POINT);
        $c2 = $t->addCol("col2", DbColType::GEO_LINE);
        $c3 = $t->addCol("col3", DbColType::GEO_POLY);
        $qb = $this->insertCommandBuilder
            ->insertInto($t)
            ->addCol($c1, $pos1)
            ->addCol($c2, $line)
            ->addCol($c3, $ring);

        // when
        $query = $qb->build();

        // then
        $this->assertEquals(
            "INSERT INTO test_table (col1, col2, col3) VALUES ("
            . "ST_PointFromText('POINT(7 47)'), "
            . "ST_LineFromText('LINESTRING(7 47,8 48)'), "
            . "ST_PolyFromText('POLYGON((7 47,8 48,9 49,7 47))'))",
            $query
        );
    }


    public function test_insert_with_table_alias_is_ignored()
    {
        // given
        $t = new DbTable("test_table", "t1");
        $c1 = $t->addCol("col1", DbColType::STRING);
        $qb = $this->insertCommandBuilder
            ->insertInto($t)
            ->addCol($c1, "value1");

        // when
        $query = $qb->build();

        // then
        $this->assertEquals("INSERT INTO test_table (col1) VALUES ('value1')", $query);
    }


    public function test_build_bind_statement_types()
    {
        // given
        $t = new DbTable("test_table", null);
        $c1 = $t->addCol("col1", DbColType::STRING);
        $c2 = $t->addCol("col2", DbColType::INT);
        $c3 = $t->addCol("col3", DbColType::DOUBLE);
        $c4 = $t->addCol("col4", DbColType::BOOL);
        $c5 = $t->addCol("col5", DbColType::TIMESTAMP);
        $c6 = $t->addCol("col6", DbColType::GEO_POINT);
        $c7 = $t->addCol("col7", DbColType::GEO_LINE);
        $c8 = $t->addCol("col8", DbColType::GEO_POLY);
        $c9 = $t->addCol("col9", DbColType::GEOMETRY);
        $qb = $this->insertCommandBuilder
            ->insertInto($t)
            ->addCol($c1, "value1")
            ->addCol($c2, 123)
            ->addCol($c3, 45.67)
            ->addCol($c4, true)
            ->addCol($c5, "2023-10-01 12:00:00")
            ->addCol($c6, "POINT(1 2)")
            ->addCol($c7, "LINESTRING(1 2, 3 4)")
            ->addCol($c8, "POLYGON((1 2, 3 4, 5 6, 1 2))")
            ->addCol($c9, "MULTIPOLYGON(((1 2, 3 4, 5 6, 1 2)))");

        // when
        $types = $qb->buildBindParamTypes();

        // then
        $this->assertEquals("sidisssss", $types);
    }


    public function test_build_prepared_statement_for_standard_types()
    {
        // given
        $t = new DbTable("test_table", null);
        $c1 = $t->addCol("col1", DbColType::STRING);
        $c2 = $t->addCol("col2", DbColType::INT);
        $c3 = $t->addCol("col3", DbColType::DOUBLE);
        $c4 = $t->addCol("col4", DbColType::BOOL);
        $c5 = $t->addCol("col5", DbColType::TIMESTAMP);
        $qb = $this->insertCommandBuilder
            ->insertInto($t)
            ->addCol($c1, "value1")
            ->addCol($c2, 123)
            ->addCol($c3, 45.67)
            ->addCol($c4, true)
            ->addCol($c5, 1753443777);

        // when
        $statementStr = $qb->build(true);

        // then
        $this->assertEquals("INSERT INTO test_table (col1, col2, col3, col4, col5) VALUES (?, ?, ?, ?, ?)", $statementStr);
    }


    public function test_build_prepared_statement_for_geo_types()
    {
        // given
        $t = new DbTable("test_table", null);
        $c1 = $t->addCol("col1", DbColType::STRING);
        $c2 = $t->addCol("col2", DbColType::GEO_POINT);
        $c3 = $t->addCol("col3", DbColType::GEO_LINE);
        $c4 = $t->addCol("col4", DbColType::GEO_POLY);
        $c5 = $t->addCol("col5", DbColType::GEOMETRY);
        $qb = $this->insertCommandBuilder
            ->insertInto($t)
            ->addCol($c1, "value1")
            ->addCol($c2, "POINT(1 2)")
            ->addCol($c3, "LINESTRING(1 2, 3 4)")
            ->addCol($c4, "POLYGON((1 2, 3 4, 5 6, 1 2))")
            ->addCol($c5, "MULTIPOLYGON(((1 2, 3 4, 5 6, 1 2)))");

        // when
        $statementStr = $qb->build(true);

        // then
        $this->assertEquals("INSERT INTO test_table (col1, col2, col3, col4, col5) VALUES "
            . "(?, ST_PointFromText(?), ST_LineFromText(?), ST_PolyFromText(?), ST_GeomFromText(?))", $statementStr);
    }


    public function test_build_statement()
    {
        // given
        $qb = $this->createAllColTypesValuesBuilder();

        // when
        $statement = $qb->buildStatement();

        // then
        $this->assertNotNull($statement);
    }


    public function test_build_and_bind_statement()
    {
        // given
        $qb = $this->createAllColTypesValuesBuilder();

        // when
        $statement = $qb->buildAndBindStatement();

        // then
        $this->assertNotNull($statement);
    }


    private function createAllColTypesValuesBuilder(): MySqlDbInsertCommandBuilder
    {
        $t = new DbTable("test_table", null);
        $c1 = $t->addCol("col1", DbColType::STRING);
        $c2 = $t->addCol("col2", DbColType::INT);
        $c3 = $t->addCol("col3", DbColType::DOUBLE);
        $c4 = $t->addCol("col4", DbColType::BOOL);
        $c5 = $t->addCol("col5", DbColType::TIMESTAMP);
        $c6 = $t->addCol("col6", DbColType::GEO_POINT);
        $c7 = $t->addCol("col7", DbColType::GEO_LINE);
        $c8 = $t->addCol("col8", DbColType::GEO_POLY);
        $c9 = $t->addCol("col9", DbColType::GEOMETRY);

        $pos1 = new Position2d(7, 47);
        $pos2 = new Position2d(8, 48);
        $pos3 = new Position2d(9, 49);
        $line = new Line2d([$pos1, $pos2]);
        $ring = new Ring2d([$pos1, $pos2, $pos3, $pos1]);

        return MySqlDbInsertCommandBuilder::create($this->mockDbService)
            ->insertInto($t)
            ->addCol($c1, "value1")
            ->addCol($c2, 123)
            ->addCol($c3, 45.67)
            ->addCol($c4, true)
            ->addCol($c5, 1753443777)
            ->addCol($c6, $pos1)
            ->addCol($c7, $line)
            ->addCol($c8, $ring)
            ->addCol($c9, "MULTIPOLYGON(((1 2, 3 4, 5 6, 1 2)))");
    }
}
