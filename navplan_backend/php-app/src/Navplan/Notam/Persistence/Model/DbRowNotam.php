<?php declare(strict_types=1);

namespace Navplan\Notam\Persistence\Model;

use Navplan\System\DbQueryBuilder\Domain\Model\DbRow;


class DbRowNotam extends DbRow
{
    public function __construct(
        private readonly DbTableNotam $table,
        array $row
    )
    {
        parent::__construct($row);
    }


    public function getId(): int
    {
        return $this->getValue($this->table->colId());
    }


    public function getNotamId(): string
    {
        return $this->getValue($this->table->colNotamId());
    }


    public function getCountry(): string
    {
        return $this->getValue($this->table->colCountry());
    }


    public function getType(): string
    {
        return $this->getValue($this->table->colType());
    }


    public function getIcao(): string
    {
        return $this->getValue($this->table->colIcao());
    }


    public function getStartDate(): string
    {
        return $this->getValue($this->table->colStartDate());
    }


    public function getEndDate(): string
    {
        return $this->getValue($this->table->colEndDate());
    }


    public function getNotam(): string
    {
        return $this->getValue($this->table->colNotam());
    }
}

