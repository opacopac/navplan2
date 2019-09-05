<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section7;


class BitwiseParser {
    private $data;
    private $bitPos = 0;
    private $currentByte;


    public function __construct(string $data) {
        $this->data = $data;
        $this->readByte();
    }


    public function readValue(int $bitCount): ?int {
        if ($bitCount < 1) {
            throw new \InvalidArgumentException('must read min 1 bit!');
        }

        $value = 0;

        for ($i = 0; $i < $bitCount; $i++) {
            if ($this->bitPos / 8 >= strlen($this->data)) {
                return NULL;
            }

            $value += $this->readBit() << ($bitCount - 1 - $i);
        }

        return $value;
    }


    private function readBit(): int {
        $shiftBits = 7 - $this->bitPos % 8;
        $bitValue = ($this->currentByte & (0b1 << $shiftBits)) >> $shiftBits;

        $this->bitPos++;
        if ($this->bitPos % 8 === 0 && $this->bitPos / 8 < strlen($this->data)) {
            $this->readByte();
        }

        return $bitValue;
    }


    private function readByte(): void {
        $bytePos = $this->getBytePos($this->bitPos);
        $this->currentByte = unpack("C1a", $this->data, $bytePos)["a"];
    }


    private function getBytePos(int $bitPos): int {
        return intval(floor($bitPos / 8));
    }
}
