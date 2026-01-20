"""make cause.deadline timezone aware

Revision ID: cc7d2b3fa929
Revises: 63fc1f4ec3ac
Create Date: 2026-01-20 19:16:42.346675

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'cc7d2b3fa929'
down_revision: Union[str, Sequence[str], None] = '63fc1f4ec3ac'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
