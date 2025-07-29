<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbExpText extends DbExp
{
    private function __construct(
        public readonly string $text
    )
    {
    }


    public static function create(string $text): DbExpText
    {
        return new DbExpText($text);
    }
}
