<?php

namespace App\Enums;

enum Length: int
{
    case SHORT  = 1;
    case MIDDLE = 2;
    case LONG   = 3;

    public function word(): string
    {
        return match($this) {
            self::SHORT  => "短め",
            self::MIDDLE => "中程度",
            self::LONG   => "長め",
        };
    }
}
