import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
@Injectable()
export class TtsyService {
  private listGroupApi = '/admin.list-group.get';
  private createResourceGroupApi = '/admin.create-resource-group.post';
  private searchResourceGroupApi = '/admin.search-resource-group.get';
  private deleteResourceGroupApi = '/admin.delete-resource-group.del';
  private createResourceApi = '/admin.create-resource.post';
  private listResourceApi = '/admin.list-resource.get';
  private deleteResourceApi = '/admin.delete-resource.del';
  private searchResourceApi = '/admin.search-resource.get';
  private toggleRecommandApi = '/admin.toggle-recommand.put';

  private adminApi = {
    // banner
    banner: {
      listBanner: '/admin.list-banner.get',//banner列表
      createBanner: '/admin.create-banner.post',//创建banner,
      deleteBanner: '/admin.delete-banner.del',
      updateBanner: '/admin.update-banner.put',
    },
    resource: {
      updateResource: '/admin.update-resource.put',

    },
    resourceGroup: {
      updateResourceGroup: '/admin.update-resource-group.put'
    }

  }

  getListGroup() {
    return this.api.Get(this.listGroupApi);
  }

  createResourceGroup(group: { name?, comment?: string, isRecommand?: boolean }) {
    return this.api.Post(this.createResourceGroupApi, group)
  }
  searchResourceGroup(keyword: string) {
    return this.api.Get(this.searchResourceGroupApi, { search: { keyword } });
  }

  createResource(resource: { name?: string, comment?: string, file?: string, group?: string, thumb?: string }) {
    return this.api.Post(this.createResourceApi, resource);
  }
  deleteResourceGroup(groupId: string) {
    return this.api.Delete(this.deleteResourceGroupApi, { search: { groupId } });
  }
  listResources(groupId?: string) {
    return this.api.Get(this.listResourceApi, { search: { groupId } });
  }
  deleteResource(resourceId?: string) {
    return this.api.Delete(this.deleteResourceApi, { search: { resourceId } });
  }
  searchResource(keyword: string) {
    return this.api.Get(this.searchResourceApi, { search: { keyword } });
  }
  toggleRecommand(groupId: string, isRecommand: boolean) {
    return this.api.Put(this.toggleRecommandApi, { isRecommand }, { search: { groupId } });
  }

  listBanner() {
    return this.api.Get(this.adminApi.banner.listBanner);
  }
  createBanner(newBanner: any) {
    return this.api.Post(this.adminApi.banner.createBanner, newBanner);
  }
  deleteBanner(bannerId: string) {
    return this.api.Delete(this.adminApi.banner.deleteBanner, { search: { bannerId } });
  }
  updateBanner(bannerId: string, newBanner: any) {
    return this.api.Put(this.adminApi.banner.updateBanner, newBanner, { search: { bannerId } });
  }
  updateResource(resourceId, newResource) {
    return this.api.Post(this.adminApi.resource.updateResource, newResource, { search: { resourceId } });
  }
  updateResourceGroup(groupId, newResource) {
    return this.api.Put(this.adminApi.resourceGroup.updateResourceGroup, newResource, { search: { groupId } });
  }


  constructor(public api: ApiService) { }

}
