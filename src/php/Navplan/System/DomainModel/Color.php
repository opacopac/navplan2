<?php declare(strict_types=1);

namespace Navplan\System\DomainModel;


class Color {
    public const NUM_COLOR_VALUES = 4;
    public const R = 'r';
    public const G = 'g';
    public const B = 'b';
    public const A = 'a';
    public const TRANSPARENT = [self::R => 0.0, self::G => 0.0, self::B => 0.0, self::A => 0.0];
    public const BLACK = [self::R => 0.0, self::G => 0.0, self::B => 0.0, self::A => 1.0];
    public const WHITE = [self::R => 1.0, self::G => 1.0, self::B => 1.0, self::A => 1.0];
}
