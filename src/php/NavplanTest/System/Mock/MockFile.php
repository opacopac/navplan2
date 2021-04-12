<?php declare(strict_types=1);

namespace NavplanTest\System\Mock;

use Navplan\System\DomainModel\IFile;


class MockFile implements IFile {
    public bool $fcloseResult;

    public int $fseekResult;
    public array $fseekArgs;

    public ?string $freadResult;
    public array $freadArgs;

    public ?string $fgetsResult;

    public int $feofCountUntilResultTrue;


    public function __construct() {
    }


    public function fclose(): bool {
        return $this->fcloseResult;
    }


    public function fseek(int $offset): int {
        return $this->fseekResult;
    }


    public function fread(int $length): ?string {
        return $this->freadResult;
    }


    public function fgets(): ?string {
        return $this->fgetsResult;
    }


    public function feof(): bool {
        if ($this->feofCountUntilResultTrue > 0) {
            $this->feofCountUntilResultTrue--;

            return FALSE;
        }

        return TRUE;
    }
}
