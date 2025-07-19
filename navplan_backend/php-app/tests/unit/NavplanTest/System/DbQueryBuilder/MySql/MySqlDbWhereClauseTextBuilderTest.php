<?php declare(strict_types=1);

namespace NavplanTest\System\DbQueryBuilder\MySql;

use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOpTxt;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereText;
use Navplan\System\DbQueryBuilder\MySql\MySqlDbWhereClauseTextBuilder;
use NavplanTest\System\Db\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


class MySqlDbWhereClauseTextBuilderTest extends TestCase
{
    private MySqlDbWhereClauseTextBuilder $whereClauseBuilder;


    protected function setUp(): void
    {
        parent::setUp();

        $mockDbService = new MockDbService();
        $this->whereClauseBuilder = MySqlDbWhereClauseTextBuilder::create($mockDbService);
    }


    public function test_like_prefix()
    {
        // given
        $clause = DbWhereText::create("col1", DbWhereOpTxt::LIKE_PREFIX, "value1");
        $wcb = $this->whereClauseBuilder->clause($clause);

        // when
        $query = $wcb->build();

        // then
        $this->assertEquals("col1 LIKE 'value1%'", $query);
    }


    public function test_like_suffix()
    {
        // given
        $clause = DbWhereText::create("col1", DbWhereOpTxt::LIKE_SUFFIX, "value1");
        $wcb = $this->whereClauseBuilder->clause($clause);

        // when
        $query = $wcb->build();

        // then
        $this->assertEquals("col1 LIKE '%value1'", $query);
    }


    public function test_like_substring()
    {
        // given
        $clause = DbWhereText::create("col1", DbWhereOpTxt::LIKE_SUBSTR, "value1");
        $wcb = $this->whereClauseBuilder->clause($clause);

        // when
        $query = $wcb->build();

        // then
        $this->assertEquals("col1 LIKE '%value1%'", $query);
    }
}
