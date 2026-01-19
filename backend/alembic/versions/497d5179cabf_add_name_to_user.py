"""add name to user

Revision ID: 497d5179cabf
Revises: 4ed4af6a72f4
Create Date: 2026-01-19 02:19:43.683014

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '497d5179cabf'
down_revision: Union[str, Sequence[str], None] = '4ed4af6a72f4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
