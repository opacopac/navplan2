<?php declare(strict_types=1);

namespace NavplanTest\System\DbQueryBuilder\MySql;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbCondSimpleBuilder;
use NavplanTest\System\Db\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


class MySqlDbCondSimpleBuilderTest extends TestCase
{
    private MySqlDbCondSimpleBuilder $whereClauseBuilder;


    protected function setUp(): void
    {
        parent::setUp();

        $mockDbService = new MockDbService();
        $this->whereClauseBuilder = MySqlDbCondSimpleBuilder::create($mockDbService);
    }


    public function test_text()
    {
        // given
        $clause = DbCondSimple::equals("col1", "value1");
        $wcb = $this->whereClauseBuilder->condition($clause);

        // when
        $clauseStr = $wcb->build();

        // then
        $this->assertEquals("col1 = 'value1'", $clauseStr);
    }


    public function test_int()
    {
        // given
        $clause = DbCondSimple::equals("col1", 123);
        $wcb = $this->whereClauseBuilder->condition($clause);

        // when
        $query = $wcb->build();

        // then
        $this->assertEquals("col1 = 123", $query);
    }


    public function test_float()
    {
        // given
        $clause = DbCondSimple::equals("col1", -123.456);
        $wb = $this->whereClauseBuilder->condition($clause);

        // when
        $query = $wb->build();

        // then
        $this->assertEquals("col1 = -123.456", $query);
    }


    public function test_bool_true()
    {
        // given
        $clause = DbCondSimple::equals("col1", true);
        $wb = $this->whereClauseBuilder->condition($clause);

        // when
        $query = $wb->build();

        // then
        $this->assertEquals("col1 = 1", $query);
    }


    public function test_bool_false()
    {
        // given
        $clause = DbCondSimple::equals("col1", false);
        $wb = $this->whereClauseBuilder->condition($clause);

        // when
        $query = $wb->build();

        // then
        $this->assertEquals("col1 = 0", $query);
    }


    public function test_null()
    {
        // given
        $clause = DbCondSimple::equals("col1", null);
        $wb = $this->whereClauseBuilder->condition($clause);

        // when
        $query = $wb->build();

        // then
        $this->assertEquals("col1 IS NULL", $query);
    }


    public function test_not_null()
    {
        // given
        $clause = DbCondSimple::create("col1", DbCondOp::NE, null);
        $wb = $this->whereClauseBuilder->condition($clause);

        // when
        $query = $wb->build();

        // then
        $this->assertEquals("col1 IS NOT NULL", $query);
    }
}
