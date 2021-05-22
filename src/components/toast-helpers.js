import React from "react";
import { toast } from "react-toastify";
import clsx from "clsx";

function ToastHelper({ title = "", detail = "", isIcon, icon }) {
  return (
    <div className="ui grid margin-no">
      {isIcon && (
        <div className="one wide middle aligned column margin-right-ten padding-vs-left">
          <i className={clsx(icon, "icon")}></i>
        </div>
      )}
      <div className="fourteen wide middle aligned column padding-no-right">
        <p className="text-weight-medium margin-bottom-five">{title}</p>
        <p className="text-size-small word-break">{detail}</p>
      </div>
    </div>
  );
}

export function toastError(error, isIcon) {
  if (error && error.response && error.response.data && error.response.data.message) {
    const errorData = error.response.data;
    if (Array.isArray(errorData.message)) {
      error.response.data.message.forEach((e) => {
        return toast.error(<ToastHelper {...e} isIcon={isIcon} icon={"times circle outline"} />);
      });
    } else {
      toast.error(
        <ToastHelper
          {...errorData}
          title={errorData.error}
          isIcon={isIcon}
          icon={"times circle outline"}
        />
      );
    }
  } else if (error && error.response && error.response.data) {
    let e = {
      title: error.response.data.error,
      detail: error.message
    };
    return toast.error(<ToastHelper {...e} />);
  } else {
    return toast.error(error.message);
  }
}
export function toastSuccess(message, isIcon) {
  if (message.title || message.detail) {
    toast.success(<ToastHelper {...message} isIcon={isIcon} icon={"check circle outline"} />);
  } else {
    toast.success(message);
  }
}
