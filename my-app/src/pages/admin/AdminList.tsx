import { Pencil, Trash } from "phosphor-react";
import { RemoveButton } from "../bestellung/stylesBestellung/Warenkorb.styles";
import { AdminListWrapper } from "./Admin.styles";

interface AdminListProps {
  children?: React.ReactNode;
  editable?: boolean;
  deletable?: boolean;
  onRemove?: () => void;
  onEdit?: () => void;
}

export function AdminList(props: AdminListProps) {
  return (
    <AdminListWrapper>
      {props.children}
      {props.editable ? (
        <RemoveButton onClick={props.onEdit}>
          <Pencil size={30} />
        </RemoveButton>
      ) : null}
      {props.deletable ? (
        <RemoveButton onClick={props.onRemove}>
          <Trash size={30} />
        </RemoveButton>
      ) : null}
    </AdminListWrapper>
  );
}
