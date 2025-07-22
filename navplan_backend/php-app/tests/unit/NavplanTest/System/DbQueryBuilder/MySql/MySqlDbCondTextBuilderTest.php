<?php declare(strict_types=1);

namespace NavplanTest\System\DbQueryBuilder\MySql;

use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOpTxt;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondText;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbCondTextBuilder;
use NavplanTest\System\Db\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


class MySqlDbCondTextBuilderTest extends TestCase
{
    private MySqlDbCondTextBuilder $whereClauseBuilder;


    protected function setUp(): void
    {
        parent::setUp();

        $mockDbService = new MockDbService();
        $this->whereClauseBuilder = MySqlDbCondTextBuilder::create($mockDbService);
    }


    public function test_like_prefix()
    {
        // given
        $t = new DbTable("test_table", "t1", ["col1", "col2"]);
        $c1 = $t->getCol("col1");
        $clause = DbCondText::create($c1, DbCondOpTxt::LIKE_PREFIX, "value1");
        $wcb = $this->whereClauseBuilder->condition($clause);

        // when
        $query = $wcb->build();

        // then
        $this->assertEquals("t1.col1 LIKE 'value1%'", $query);
    }


    public function test_like_suffix()
    {
        // given
        $clause = DbCondText::create("col1", DbCondOpTxt::LIKE_SUFFIX, "value1");
        $wcb = $this->whereClauseBuilder->condition($clause);

        // when
        $query = $wcb->build();

        // then
        $this->assertEquals("col1 LIKE '%value1'", $query);
    }


    public function test_like_substring()
    {
        // given
        $clause = DbCondText::create("col1", DbCondOpTxt::LIKE_SUBSTR, "value1");
        $wcb = $this->whereClauseBuilder->condition($clause);

        // when
        $query = $wcb->build();

        // then
        $this->assertEquals("col1 LIKE '%value1%'", $query);
    }
}
