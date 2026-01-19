"""add name to users

Revision ID: 223f338029fb
Revises: 497d5179cabf
Create Date: 2026-01-19 16:12:32.799592

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '223f338029fb'
down_revision: Union[str, Sequence[str], None] = '497d5179cabf'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
